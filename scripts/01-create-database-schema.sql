-- Creating comprehensive database schema for PQRSD management system

-- Users table with role-based access
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'operator', 'department_head', 'citizen')),
    department_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments/Dependencies table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    head_user_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PQRSD types configuration
CREATE TABLE IF NOT EXISTS pqrsd_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Petición, Queja, Reclamo, Sugerencia, Denuncia
    code VARCHAR(10) NOT NULL UNIQUE,
    response_days INTEGER NOT NULL, -- Legal response time in days
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main PQRSD requests table
CREATE TABLE IF NOT EXISTS pqrsd_requests (
    id SERIAL PRIMARY KEY,
    filing_number VARCHAR(50) UNIQUE NOT NULL, -- Número de radicado
    pqrsd_type_id INTEGER NOT NULL,
    citizen_name VARCHAR(200) NOT NULL,
    citizen_email VARCHAR(255),
    citizen_phone VARCHAR(20),
    citizen_id_number VARCHAR(50),
    citizen_id_type VARCHAR(20) CHECK (citizen_id_type IN ('CC', 'CE', 'TI', 'NIT', 'PP')),
    organization_name VARCHAR(200), -- If petitioner is an organization
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    status VARCHAR(50) DEFAULT 'received' CHECK (status IN ('received', 'assigned', 'in_progress', 'pending_info', 'resolved', 'closed')),
    assigned_department_id INTEGER,
    assigned_user_id INTEGER,
    due_date DATE NOT NULL, -- Calculated based on pqrsd_type response_days
    response_date TIMESTAMP,
    is_overdue BOOLEAN DEFAULT false,
    created_by_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pqrsd_type_id) REFERENCES pqrsd_types(id),
    FOREIGN KEY (assigned_department_id) REFERENCES departments(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id),
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
);

-- PQRSD status history for traceability
CREATE TABLE IF NOT EXISTS pqrsd_status_history (
    id SERIAL PRIMARY KEY,
    pqrsd_request_id INTEGER NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id INTEGER NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pqrsd_request_id) REFERENCES pqrsd_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by_user_id) REFERENCES users(id)
);

-- Comments and responses
CREATE TABLE IF NOT EXISTS pqrsd_comments (
    id SERIAL PRIMARY KEY,
    pqrsd_request_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT true, -- Internal comments vs citizen-visible responses
    is_final_response BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pqrsd_request_id) REFERENCES pqrsd_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- File attachments
CREATE TABLE IF NOT EXISTS pqrsd_attachments (
    id SERIAL PRIMARY KEY,
    pqrsd_request_id INTEGER NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pqrsd_request_id) REFERENCES pqrsd_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id)
);

-- Add foreign key constraints
ALTER TABLE users ADD CONSTRAINT fk_users_department 
    FOREIGN KEY (department_id) REFERENCES departments(id);

ALTER TABLE departments ADD CONSTRAINT fk_departments_head 
    FOREIGN KEY (head_user_id) REFERENCES users(id);

-- Create indexes for better performance
CREATE INDEX idx_pqrsd_requests_filing_number ON pqrsd_requests(filing_number);
CREATE INDEX idx_pqrsd_requests_status ON pqrsd_requests(status);
CREATE INDEX idx_pqrsd_requests_due_date ON pqrsd_requests(due_date);
CREATE INDEX idx_pqrsd_requests_citizen_email ON pqrsd_requests(citizen_email);
CREATE INDEX idx_pqrsd_requests_assigned_department ON pqrsd_requests(assigned_department_id);
CREATE INDEX idx_pqrsd_requests_created_at ON pqrsd_requests(created_at);
CREATE INDEX idx_pqrsd_status_history_request_id ON pqrsd_status_history(pqrsd_request_id);

-- Function to generate filing numbers automatically
CREATE OR REPLACE FUNCTION generate_filing_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.filing_number := 'PQRSD-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || 
                        LPAD(NEXTVAL('pqrsd_filing_sequence')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for filing numbers
CREATE SEQUENCE IF NOT EXISTS pqrsd_filing_sequence START 1;

-- Trigger to auto-generate filing numbers
CREATE TRIGGER trigger_generate_filing_number
    BEFORE INSERT ON pqrsd_requests
    FOR EACH ROW
    WHEN (NEW.filing_number IS NULL)
    EXECUTE FUNCTION generate_filing_number();

-- Function to calculate due dates based on PQRSD type
CREATE OR REPLACE FUNCTION calculate_due_date()
RETURNS TRIGGER AS $$
BEGIN
    SELECT CURRENT_DATE + INTERVAL '1 day' * response_days
    INTO NEW.due_date
    FROM pqrsd_types
    WHERE id = NEW.pqrsd_type_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate due dates
CREATE TRIGGER trigger_calculate_due_date
    BEFORE INSERT ON pqrsd_requests
    FOR EACH ROW
    WHEN (NEW.due_date IS NULL)
    EXECUTE FUNCTION calculate_due_date();

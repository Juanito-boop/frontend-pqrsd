-- Seeding initial data for PQRSD system

-- Insert default PQRSD types with Colombian legal response times
INSERT INTO pqrsd_types (name, code, response_days, description) VALUES
('Petición', 'PET', 15, 'Solicitud de información o actuación administrativa'),
('Queja', 'QUE', 15, 'Manifestación de protesta, censura o inconformidad'),
('Reclamo', 'REC', 15, 'Solicitud de corrección de situación particular'),
('Sugerencia', 'SUG', 15, 'Propuesta de mejoramiento de procesos o servicios'),
('Denuncia', 'DEN', 30, 'Puesta en conocimiento de conductas irregulares'),
('Derecho de Petición', 'DP', 15, 'Solicitud formal de información o actuación'),
('Tutela', 'TUT', 10, 'Acción constitucional para protección de derechos fundamentales');

-- Insert default departments
INSERT INTO departments (name, description) VALUES
('Atención al Ciudadano', 'Departamento encargado de la recepción y gestión inicial de PQRSD'),
('Jurídica', 'Departamento legal para asuntos jurídicos y normativos'),
('Administrativa', 'Departamento administrativo y de gestión interna'),
('Sistemas', 'Departamento de tecnología e informática'),
('Talento Humano', 'Departamento de recursos humanos'),
('Financiera', 'Departamento financiero y contable'),
('Planeación', 'Departamento de planeación y desarrollo');

-- Insert default admin user (password should be changed on first login)
INSERT INTO users (email, password_hash, first_name, last_name, role, department_id) VALUES
('admin@pqrsd.gov.co', '$2b$10$example_hash_change_this', 'Administrador', 'Sistema', 'admin', 1);

-- Update department head
UPDATE departments SET head_user_id = 1 WHERE id = 1;

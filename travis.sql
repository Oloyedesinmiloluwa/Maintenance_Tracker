CREATE TABLE Requests (ID SERIAL, title varchar, description varchar, category varchar, image varchar, status varchar, dated date );
INSERT INTO Requests (title, description, category, image, status, dated)
VALUES ('Faulty Fan','we have a fault', 'electrical','' ,'approved','2018-12-13'),
('Faulty Fan','we have a fault', 'electrical','' ,'approved','2018-12-13'),
('Faulty Fan','we have a fault', 'mechanical','' ,'disapproved','2018-12-13'),
('Faulty Fan','we have a fault', 'physical','' ,'disapproved','2018-12-13'),
('Faulty Fan','we have a fault', 'electrical','' ,'resolved','2018-12-13'),
('Faulty Fan','we have a fault', 'electrical','' ,'resolved','2018-12-13'),
('Faulty Fan','we have a fault', 'electrical','' ,'pending','2018-12-13'),
('Faulty Fan','we have a fault', 'electrical','' ,'pending','2018-12-13');
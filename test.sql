-- DONNÉES DE TEST POUR PC BANG MANAGER
-- Ce fichier contient des données de démonstration pour tester l'application

-- 1. Ajout d'abonnements de test
INSERT INTO Abonnement (type, prix, duree) VALUES
('Basique', 10.00, 30),    -- Abonnement basique (10€/mois)
('Premium', 25.00, 30),    -- Abonnement premium (25€/mois)
('VIP', 50.00, 30);        -- Abonnement VIP (50€/mois)

-- 2. Clients de test
INSERT INTO Client (nom, prenom, email, telephone, id_abonnement) VALUES
('Nom1', 'Prenom1', 'c1@email.com', '0102030405', 1),
('Nom2', 'Prenom2', 'c2@email.com', '0102030406', 2),
('Nom3', 'Prenom3', 'c3@email.com', '0102030407', NULL),
('Nom4', 'Prenom4', 'c4@email.com', '0102030408', 3);

-- 3. Postes de test
INSERT INTO Poste (numero_poste, statut, type) VALUES
('P1', 'Libre', 'Standard'),
('P2', 'Libre', 'Premium'),
('P3', 'Libre', 'Standard'),
('P4', 'Libre', 'Premium'),
('P5', 'Libre', 'Standard');

-- 4. Réservations de test
INSERT INTO Reservation (id_client, id_poste, date_debut, duree, statut) VALUES
(1, 1, '2025-11-22 14:00:00', 2, 'En cours'),
(2, 3, '2025-11-22 15:30:00', 4, 'Confirmée'),
(3, 5, '2025-11-22 13:00:00', 1, 'Terminée'),
(1, 2, '2025-11-23 10:00:00', 3, 'Confirmée'),
(4, 4, '2025-11-23 16:00:00', 2, 'En attente');

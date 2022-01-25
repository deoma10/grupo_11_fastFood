use Grupo_11_fastFood_DB;

INSERT INTO documenttypes (name, description) values
('CC', 'Cédula de ciudadania'),
('CE', 'Cédula de Extranjeria'),
('NIT', 'Número de identificación tributaria');

INSERT INTO images (name) values
('burger-featured-1.png'),
('burger-featured-2.png'),
('burger-featured-3.png'),
('burger-featured-4.png'),
('burger-featured-5.png'),
('burger-featured-6.png'),
('default-image.png'),
('default-image.png');

INSERT INTO users (documentNumber, Name, lastName, email, password,receivesEmail,privacyPolicies,rol, activated,fk_idImage,fk_idDocumentType) values
(123456789,'Seiumour', 'Skinner', 'admin@gmail.com', '$2a$10$S.SKV1.ndGx8nKRKHyNX5udcNh9bykZnkPRmfebUL1rQXubqd4a9q', 'on', 'on', 9, 1, 7, 1 ),
(987654321,'Homero','Simpson','homero@gmail.com', '$2a$10$S.SKV1.ndGx8nKRKHyNX5udcNh9bykZnkPRmfebUL1rQXubqd4a9q', 'on', 'on', 1, 1, 8, 1);

INSERT INTO products (name, description, price, fk_idImage) values
('Crispy Onion', 'Pan artesanal, salsa de la casa y bbq, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso americano, tocineta y cebolla crispy', 25900, 1),
('Red Pepper', 'Pan artesanal, salsa de la casa y sweet mayo, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso americano y pimentones rojos caramelizados', 25900, 2),
('Choriburger', 'Pan artesanal, salsa de la casa y chipotle, lechuga, tomate, 150gr. de carne de hamburguesa seleccionada, queso americano y chorizo argentino, bañado en chimichurri', 25900, 3),
('DR Pepper Jacks', 'Pan artesanal, lechuga, 150 gramos de certified angus beef, cubiertos de queso pepper jack, cebolla puerro crocante y nuestra salsa exclusiva DR PEPPER, incluye papas fritas', 27500, 4),
('La Nativa', 'Pan artesanal, salsa de la casa y sweet mayo, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso costeño asado y cebolla caramelizada', 24900, 5),
('Veggie Burger', 'Pan artesanal, aderezo de la casa, lechuga, tomate, cebolla y 150gr. de nuestra deliciosa croqueta de garbanzos', 18900, 6);


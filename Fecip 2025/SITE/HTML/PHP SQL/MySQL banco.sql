SHOW DATABASES;
use pontos;


use pontos;
CREATE TABLE musicas (
id int auto_increment primary key,
titulo varchar(100) not null,
artista varchar(100) not null,
niveldificuldade int default 1,
pontosbase int default 10,
liberada boolean default false,
urlvideo varchar (255) not null
);

create table usuarios(
id int auto_increment primary key,
nome varchar(100) unique not null, 
email varchar(100) unique not null,
pontostotais int default 0
);

CREATE TABLE usuariosmusicas(
id int auto_increment primary key,
usuario_id int not null,
musicas_id int not null,
completou boolean default false,
pontos_ganhos int default 0,
data_conclusao datetime,
foreign key (usuario_id) references usuarios(id),
foreign key(musicas_id) references musicas(id)
);

insert into musicas (titulo, artista, niveldificuldade, pontosbase, liberada, urlvideo)
VALUES 
('Amiga da Minha Mulher', 'Seu Jorge', 6 , 10, TRUE, 'https://vimeo.com/1118601982?fl=pl&fe=sh'),
('Expresso', 'Sabrina Carpenter', 7, 10, TRUE, 'https://vimeo.com/1118599952?fl=pl&fe=sh'),
('Acenda o Farol', 'Tim Maia', 5, 10, TRUE, 'https://vimeo.com/1118720811?fl=pl&fe=sh'),
('Até Que Durou', 'Péricles', 6, 10, TRUE, 'https://vimeo.com/1118587801?share=copy'),
('Single Ladies', 'Beyoncé', 9, 10, TRUE, 'https://vimeo.com/1111782918?share=copy');

insert into musicas (titulo, artista, niveldificuldade, pontosbase, liberada, urlvideo)
VALUES 
('Fico Assim Sem Você', ' Claudinho e Buchecha', 5, 10, FALSE, 'pendente'),
('Bad Romance', 'Lady Gaga', 8, 10, FALSE, 'pendente'),
('Blinding Lights', 'The Weeknd', 7, 10, FALSE, 'pendente'),
('Por Onde Anda Você', 'Vinicius de Moraes', 4, 10, FALSE, 'pendente'),
('Dancing Queen', 'Abba', 7, 10, FALSE, 'pendente'),
('Bohemian Rhapsody', 'Queen ', 10, 10, FALSE, 'pendente'),
('Smooth Criminal', 'Michael Jackson', 9, 10, FALSE, 'pendente');

insert into usuarios (nome, email) value ('dandara', 'dandaracv@gmail.com');

SELECT * FROM musicas;
SHOW TABLES;


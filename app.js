const express = require('express');
const port = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

let listaLivros = [];
let IDlivros = 1;

app.post('/livros', function(req, res) {
    const livro = {
        id: IDlivros++,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        paginas: req.body.paginas
    };
    listaLivros.push(livro);
    res.status(201).json(livro);
});

app.get('/livros', function(req, res) {
    res.status(200).json(listaLivros);
});

app.get('/livros/:id', function(req, res) {
    const id = parseInt(req.params.id);
    let livroEncontrado = null;

    for (let i = 0; i < listaLivros.length; i++) {
        if (listaLivros[i].id === id) {
            livroEncontrado = listaLivros[i];
            break;
        }
    }

    if (!livroEncontrado) {
        return res.status(404).json({ erro: 'Livro não encontrado!' });
    }

    res.status(200).json(livroEncontrado);
});

app.put('/livros/:id', function(req, res) {
    const id = parseInt(req.params.id);
    let livro = null;

    for (let i = 0; i < listaLivros.length; i++) {
        if (listaLivros[i].id === id) {
            livro = listaLivros[i];
            livro.titulo = req.body.titulo;
            livro.autor = req.body.autor;
            livro.ano = req.body.ano;
            livro.paginas = req.body.paginas;
            break;
        }
    }

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' });
    }

    res.status(200).json(livro);
});

app.delete('/livros/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const index = listaLivros.findIndex(function(livro) {
        return livro.id === id;
    });

    if (index === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado!' });
    }

    listaLivros.splice(index, 1);
    res.status(204).send();
});

let listaUsuarios = [];
let IDusuarios = 1;

// Rotas para Usuários (agora com /usuarios)
app.post('/usuarios', function(req, res) {
    const usuario = {
        id: IDusuarios++,
        nome: req.body.nome,
        email: req.body.email,
        dataInscricao: req.body.dataInscricao
    };
    listaUsuarios.push(usuario);
    res.status(201).json(usuario);
});

app.get('/usuarios', function(req, res) {
    res.status(200).json(listaUsuarios);
});

app.get('/usuarios/:id', function(req, res) {
    const id = parseInt(req.params.id);
    let usuarioEncontrado = null;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].id === id) {
            usuarioEncontrado = listaUsuarios[i];
            break;
        }
    }

    if (!usuarioEncontrado) {
        return res.status(404).json({ erro: 'Usuário não encontrado!' });
    }

    res.status(200).json(usuarioEncontrado);
});

app.put('/usuarios/:id', function(req, res) {
    const id = parseInt(req.params.id);
    let usuario = null;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].id === id) {
            usuario = listaUsuarios[i];
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.dataInscricao = req.body.dataInscricao;
            break;
        }
    }

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado!' });
    }

    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const index = listaUsuarios.findIndex(function(usuario) {
        return usuario.id === id;
    });

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado!' });
    }

    listaUsuarios.splice(index, 1);
    res.status(204).send();
});

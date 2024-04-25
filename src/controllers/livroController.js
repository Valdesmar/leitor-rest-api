import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req, res, next) {
        console.log("Busca /livros/ feita!");
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (err) {
            next(err);
        }
    }

    static async listarLivrosPorId (req, res, next) {
        try {
            const parametroDePesquisaId = req.params.id;
            const listaLivroPorId = await livro.findById(parametroDePesquisaId);

            if (listaLivroPorId != null){
                res.status(200).json(listaLivroPorId);
            } else {
                res.status(404).send({message: "Id do Livro não localizado."});
            } 
        } catch (err) {
            next(err);
        }
    }

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso:", livro: livroCriado });
        } catch (err) {
            next(err);
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualiado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }

    static async excluirLivro (req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro deletado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }

    static async listarLivrosPorTitulo (req, res, next) {
        const titulo = req.query.titulo;
        try {
            const livroPorTitulo = await livro.find({ titulo: titulo});
            res.status(200).json(livroPorTitulo);
        } catch (err) {
            next(err);
        }
    }
    
}

export default LivroController;

import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na requisição` });
        }
    }

    static async listarLivrosPorId (req, res) {
        try {
            const parametroDePesquisaId = req.params.id;
            const listaLivroPorId = await livro.findById({ titulo: parametroDePesquisaId });
            res.status(200).json(listaLivroPorId);
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na requisição` });
        }
    }

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso:", livro: livroCriado });
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha ao cadastrar livro` });
        }
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualiado com sucesso!"});
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na atualização de Livro` });
        }
    }

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro deletado com sucesso!"});
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha ao tentar deletar Livro` });
        }
    }

    static async listarLivrosPorTitulo (req, res) {
        const titulo = req.query.titulo;
        try {
            const livroPorTitulo = await livro.find({ titulo: titulo});
            res.status(200).json(livroPorTitulo);
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na requisição` });
        }
    }

}

export default LivroController;

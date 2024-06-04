import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na requisição` });
        }
    }

    static async listarAutoresPorNome (req, res) {
        try {
            const parametroDePesquisaNome = req.params.nome;
            const listaAutorPorNome = await autor.findOne({ nome: parametroDePesquisaNome });
            res.status(200).json(listaAutorPorNome);
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na requisição` });
        }
    }

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "criado com sucesso:", autor: novoAutor });
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha ao cadastrar autor` });
        }
    }

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualiado com sucesso!"});
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha na atualização de Autor` });
        }
    }

    static async excluirAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor deletado com sucesso!"});
        } catch (err) {
            res
                .status(500)
                .json({ message: `${err.message} - falha ao tentar deletar Autor` });
        }
    }

}

export default AutorController;

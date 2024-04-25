import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores (req, res, next) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (err) {
            next(err);
        }
    }

    static async listarAutoresPorId (req, res, next) {
        try {
            const parametroDeAutorId = req.params.id;
            const listaAutorPorId = await autor.findById(parametroDeAutorId);

            if (listaAutorPorId != null){
                res.status(200).json(listaAutorPorId);
            } else {
                res.status(404).send({message: "Id do Autor não localizado."});
            }   
        } catch (err) {
            next(err);
        }
    }
    
    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "criado com sucesso:", autor: novoAutor });
        } catch (err) {
            next(err);
        }
    }
    
    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualiado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }
    
    static async excluirAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor deletado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }
    
    static async listarAutoresPorNome (req, res, next) {
        try {
            const parametroDePesquisaNome = req.query.nome;
            const listaAutorPorNome = await autor.find({ nome: parametroDePesquisaNome });
            res.status(200).json(listaAutorPorNome);
        } catch (err) {
            next(err);
        }
    }
    
}

export default AutorController;

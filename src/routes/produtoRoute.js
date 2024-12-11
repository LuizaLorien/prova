import { Router } from "express";
import { buscarProduto, criarProduto, buscaridProduto, editarProduto } from '../controllers/produtoController.js'

const router = Router();

router.get('/', buscarProduto);
router.get('/:id', buscaridProduto);
router.post('/', criarProduto);
router.put('/:id', editarProduto)

export default router;
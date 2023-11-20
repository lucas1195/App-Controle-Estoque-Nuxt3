import BaseEntity from "./base-entity";
import type Categoria from "./categoria";

class Produto extends BaseEntity {
  id?: number;
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidade?: number;
  categoria?: Categoria;
  idCategoria?: number;
}
export default Produto;

import BaseEntity from "./base-entity";
import type Produto from "./produto";

class Categoria extends BaseEntity {
  idCategoria?: number;
  nome?: string;
  produtos?: Produto[];
}
export default Categoria;

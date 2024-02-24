import { GetStaticPaths, GetStaticProps } from 'next'
import { ProductContainer } from '../../styles/pages/Product'
import { useContext } from 'react'
import { ProductsContext } from '../../context/productsContext'
import Image from 'next/image'
import Link from 'next/link'
import { paramsList } from '../../../paramsList'

interface ProductsProps {
  name: string
  code: string
  brand: string
  subject: string
  model: string
  version?: string
  pnc?: string
  quantaty: number
  title: string
}

export default function Product({ productCode }: any) {
  const { productList } = useContext(ProductsContext)

  const product = productList.find(
    (product: ProductsProps) => product.code === productCode,
  )

  return (
    <ProductContainer>
      {product ? (
        <>
          <div className="description">
            <div className="ImageContainer">
              <Image
                src={`/images/productsImg/${product.code}.png`}
                width={500}
                height={500}
                className="image"
                alt={product.name}
              />
            </div>
            <section>
              <div className="title">
                <span>{product.name.toUpperCase()}</span>
                {product.version && (
                  <span className="version">Versão: {product.version}</span>
                )}
                {product.pnc && (
                  <span className="version">PNC: {product.pnc}</span>
                )}
              </div>
              <div className="codeContainer">
                <h2>Cod: {product.code}</h2>
                <h4>{product.brand}</h4>
              </div>
              <div className="productModel">
                <h3>Modelo aplicado:</h3>
                <span>{product.model.toUpperCase()}</span>
              </div>
              <div className="buttonContainer">
                <button className="button">
                  <span>ADICIONAR</span>
                </button>
                <Link href={'/'} className="link">
                  <span>VOLTAR</span>
                </Link>
              </div>
            </section>
          </div>
        </>
      ) : (
        <span>Error...</span>
      )}
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados
  return {
    paths: paramsList,
    fallback: true,
    /* fallback: 'blocking', */
  }
}

export const getStaticProps: GetStaticProps<any, { code: string }> = async ({
  params,
}) => {
  const productCode = params.code

  return {
    props: { productCode },
  }
}

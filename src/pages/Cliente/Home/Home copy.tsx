import React from 'react'
import { Header } from '@/components/Home/Header/Header'
import { Form } from '@/components/Home/Form/Form'
import { Abogados } from '@/components/Home/Abogados/Abogados'

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="row my-3">
        {
          [1,1,1,1,1,1].map( (_, index) => {
            return (
              <div className="col-4 mb-3" key={ index }>
                <Abogados />
              </div>
            )
          })
        }
      </div>
      <Form />
    </div>
  )
}

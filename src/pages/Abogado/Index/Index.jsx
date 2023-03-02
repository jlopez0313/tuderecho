import { IndexComponent } from '@/components/Abogados/Index/IndexComponent'
import { Header } from "@/components/shared/Header/Header"
import '../abogado.scss'

export const Index = () => {
  return (
    <>
        <Header />
        <div className='abogado'>
          <IndexComponent />
        </div>
    </>
  )
}

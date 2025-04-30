import  { ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

const Title = ({ children }: TitleProps) => {
  return <h1 className='text-3xl font-semibold mb-6 text-center'>{children}</h1>
}

export default Title
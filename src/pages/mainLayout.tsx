import { FC, PropsWithChildren } from 'react'
import tw from 'twin.macro'

const Main = tw.div`
`
// flex
// min-h-screen
// flex-col
// items-center
// justify-between

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Main>{children}</Main>
}

export default MainLayout

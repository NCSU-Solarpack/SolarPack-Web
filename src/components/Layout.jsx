import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <footer className="footer">
        © 2025 NC State SolarPack. All rights reserved.
      </footer>
    </>
  )
}

export default Layout
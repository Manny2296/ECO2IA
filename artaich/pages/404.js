import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <img
      src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative text-center text-white z-10">
      <p className="text-base font-semibold leading-8">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page non trouvée.</h1>
      <p className="mt-4 text-base text-white/70">Désolé, nous n'avons pas pu trouver la page que vous recherchez.</p>
      <div className="mt-10 flex justify-center">
        <a href="/" className="text-sm font-semibold leading-7 text-white">
          <span aria-hidden="true">&larr;</span> Retour à la page d'accueil
        </a>
      </div>
    </div>
  </div>
  );
  
};  

export default NotFoundPage;

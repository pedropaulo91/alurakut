import React from 'react'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ProfileSidebar from '../src/components/ProfileSidebar';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  const [seguidores, setSeguidores] = React.useState([]);

  // 0 - Pegar o array de dados do GitHub
  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((respostaDoServidor) => {
        return respostaDoServidor.json();
      })
      .then((respostaCompleta) => {
        setSeguidores(respostaCompleta);
      })

    // API GraphQl
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '0a6de819bdf440bf67ee8430eb4365',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": ` query {
      allCommunities {
        title
        id
        imageUrl
        creatorSlug
      }
    }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato);
        setComunidades(comunidadesVindasDoDato);
      });
  }, [])



  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box className="title">
            <h1>
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            {/* FORMULÁRIO */}
            <form onSubmit={criaComunidade} >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Minhas Comunidades" items={comunidades} type="comunidades" />
          <ProfileRelationsBox title="Pessoas da comunidade" items={pessoasFavoritas} type="pessoasDaComunidade" />
          <ProfileRelationsBox title="Amigos" items={seguidores} type="seguidores" />

        </div>
      </MainGrid>
    </>
  )
}

function criaComunidade(e) {
  e.preventDefault();
  const dadosDoForm = new FormData(e.target);

  console.log('Campo', dadosDoForm.get('title'));
  console.log('Campo', dadosDoForm.get('image'));

  const comunidade = {
    title: dadosDoForm.get('title'),
    imageUrl: dadosDoForm.get('image'),
    creatorSlug: 'pedropaulo'
  }

  fetch('/api/comunidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comunidade)
  })
    .then(async (response) => {
      const dados = response.json();
      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado;
      setComunidades([...comunidades, comunidade]);
    })
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;


  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  console.log('isAuthenticated: ', isAuthenticated);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    } // Will be passed to the page component as props 
  }
}

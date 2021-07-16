import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { useState } from 'react';

function ProfileSideBar(props) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="Minha foto" style={{ borderRadius: '8px' }} />
      <hr/>

      <p>
        <a className="" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />

    </Box>

  );

}

function ProfileBox(props){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle"> {props.title} ({props.items.length}) </h2>
      <ul>
        {props.items.map((itemAtual) => {
          return(
            <li key={itemAtual.id} >
              <a href={`https://github.com/${itemAtual.login}`} >
                <img src={`https://github.com/${itemAtual.login}.png`}/>
                <span>@{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
  //React.useState();
  const githubUser = 'ptmarmello';
  const [comunis, setComunis] = useState([]);
  
  const favsDevs = ['juunegreiros', 'omariosouto','peas','rafaballerini','marcobrunodev', 'felipefialho'];
  
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect( () => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => {
        return response.json();
      }).then((response) => {
        console.log(response)
        setSeguidores(response);
      })
    

      // API GraphQL -> DATO CMS
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers:{
        'Authorization':'8a14980d91c1565ae5773291728bcd',
        'Content-Type':'application/json',
        'Accept': 'application/json',
      },
      body : JSON.stringify({"query":`query {
        allCommunities {
          id
          title
          creatorSlug
          imageUrl
        }
      }` })
    })
    .then((response) => response.json())
    .then((response) => {
      const comunidadesCompletas = response.data.allCommunities;
      setComunis = comunidadesCompletas;
      console.log(comunidadesCompletas);
    })


  },[]);
    




  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea:'profileArea'}} >
        <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="WelcomeArea"  style={{gridArea:'WelcomeArea'}} >
          <Box>
            <h1 className="smallTitle">
              Bem Vindo(a), {githubUser}!
            </h1>
              <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h3>O que você deseja fazer?</h3>
            <hr />
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              const comunidade = {
                // id: new Date().toISOString(),
                title: formData.get('title'),
                // image: formData.get('image'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser
              };
              
              fetch('./api/comunidades',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              }).then(async (response) => {
                const dads = await response.json();
                console.log(dads);
                const comunidade = dads.registroCriado;
                setComunis([...comunis, comunidade]);
              })
              
            } 
            
            } >
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usar de capa" name="image" aria-label="Coloque uma URL para usar de capa" type="text"  />
              </div>
              <button type="submit">
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="ProfileRelationsArea" style={{gridArea:'ProfileRelationsArea'}}>
          <ProfileBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle"> Comunidades Dev ({comunis.length}) </h2>
            <ul>
              {comunis.map((itemAtual) => {
                return(
                  <li key={itemAtual.id} >
                    <a href={`communities/${itemAtual.title}`} key={itemAtual.title} >
                      <img src={`${itemAtual.imageUrl}`}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> Pessoas da Comunidade Dev ({favsDevs.length}) </h2>
            <ul>
              {favsDevs.map((devs) => {
                return(
                  <li key={devs.indexOf()}>
                    <a href={`https://github.com/${devs}`} key={githubUser} >
                      <img src={`https://github.com/${devs}.png`}/>
                      <span>@{devs}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

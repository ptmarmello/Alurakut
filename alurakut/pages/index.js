import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Minha foto" style={{ borderRadius: '8px' }} />
    </Box>

  );

}

export default function Home() {
  const githubUser = 'ptmarmello';
  const favsDevs = ['juunegreiros', 'omariosouto','peas','rafaballerini','marcobrunodev', 'felipefialho'];
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
              <OrkutNostalgicIconSet />
            </h1>
          </Box>
        </div>

        <div className="ProfileRelationsArea" style={{gridArea:'ProfileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> Pessoas da Comunidade Dev ({favsDevs.length}) </h2>
            <ul>
              {favsDevs.map((devs) => {
                return(
                  <li>
                    <a href={`https://github.com/${devs}`} key={githubUser} >
                      <img src={`https://github.com/${devs}.png`}/>
                      <span>{devs}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Depois eu Invento umas Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  );
}

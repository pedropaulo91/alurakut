import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export default function ProfileRelationsBox(props) {

  if (props.type === 'seguidores') {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {/* {seguidores.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`https://github.com/${itemAtual.title}.png`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })} */}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
  }

  if (props.type === 'comunidades') {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {props.items.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
  }

  if (props.type === 'pessoasDaComunidade') {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>

        <ul>
          {props.items.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`} >
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
  }

}

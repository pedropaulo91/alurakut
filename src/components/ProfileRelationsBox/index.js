import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export default function ProfileRelationsBox(props) {
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

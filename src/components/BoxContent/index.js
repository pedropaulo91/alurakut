import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

const BoxContent = (props) => {
    const lista = props.lista;
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.titulo} ({lista.length})
            </h2>
            <ul>
                {lista.map((itemAtual) => {
                    return (
                        <li key={props.tipo == "comunidades" ? itemAtual.id : itemAtual}>
                            <a href={`/users/${props.tipo == "comunidades" ? itemAtual.title : itemAtual}`}>
                                <img src={props.tipo == "comunidades" ? itemAtual.image : `https://github.com/${itemAtual}.png`} />
                                <span>{props.tipo == "comunidades" ? itemAtual.title : itemAtual}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default BoxContent

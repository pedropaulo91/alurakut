import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

export default function ProfileSidebar(props) {
    return (
        <Box as="aside">
            <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
            <hr />

            <p>
                <a className="boxLink" href={`https://github.com/${props.githubUser}`} style={{ borderRadius: '8px' }}>
                    @{props.githubUser}
                </a>
            </p>

            <hr />

            <AlurakutProfileSidebarMenuDefault />

        </Box>
    )
}


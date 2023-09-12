import styled from 'styled-components/native'

const Area = styled.TouchableOpacity``

const Avatar = styled.Image``

const InfoArea = styled.View``

const Username = styled.Text``

const SeeProfileButton = styled.View``

const SeeProfileButtonText = styled.Text``



const BarberItem = ({data}) => {
    return (
        <Area>
        <Avatar source={{uri: data.avatar}} />
        <InfoArea>
            <Username>{data.name}</Username>

            <SeeProfileButton>
            <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
            </SeeProfileButton>
        </InfoArea>

        </Area>
    )
}

export default BarberItem;
import styled from 'styled-components/native'


export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #63c2d1;
`

export const Scroller = styled.ScrollView`
flex: 1;
padding: 10px;
`

 export const HeaderArea = styled.View`
 width: 80%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin-top: 20px;
 `

 export const HeaderTitle = styled.Text`
 width: 250px;
 font-size: 24px;
 font-weight: bold;
 color: #fff;

 `

 export const SearchButton = styled.TouchableOpacity`
 width: 26px;
 height: 26px;
 `

 export const LocationArea = styled.View`
 background-color: #4eadbe;
 height: 60px;
 border-radius: 30px;
 flex-direction: row;
 align-items: center;
 padding-left: 20px;
 padding-right: 20px;
 margin-top: 30px;
 `

 export const LocationInput = styled.TextInput`
 flex: 1;
 font-size: 16px;
 color: #fff
 `

 export const LocationFinder = styled.TouchableOpacity`
 width: 26px;
 height: 26px;
 `
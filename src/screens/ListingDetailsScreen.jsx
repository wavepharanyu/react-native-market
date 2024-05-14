import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { SliderBox } from "react-native-image-slider-box";

import { colors } from '../themes/MainTheme'

import { ListItem } from '../components/lists'
import CustomText from "../components/CustomText";

const ListingDetailsScreen = ({ navigation, route }) => {
  const listing = route.params
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.closebtn}>
          <MaterialIcons name="cancel" size={30} color={colors.medium} />
        </TouchableOpacity>

        <SliderBox
          images={listing.images}
          sliderBoxHeight={300}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />

        <View style={styles.detailsContainer}>
          <CustomText style={styles.title}>{listing.title}</CustomText>
          <CustomText style={styles.location}>{listing.location}</CustomText>
          <CustomText fontWeight="bold" style={styles.price}>{'฿' + listing.price}</CustomText>

          <CustomText style={styles.titledesc}>รายละเอียดสินค้า</CustomText>
          <CustomText style={styles.detail}>{listing.description}</CustomText>

          <CustomText style={styles.titledesc}>ข้อมูลผู้ขาย</CustomText>
          <View style={styles.userContainer}>
            <ListItem
              image={require('../assets/images/profile.png')}
              title="John Doe"
              subTitle1="เลขที่สมาชิก: 87459654"
              subTitle2="เป็นสมาชิกมาแล้ว: 4 ปี 0 เดือน 17 วัน"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ListingDetailsScreen

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  location: {
    fontSize: 18,
    color: colors.textholder,
  },
  price: {
    fontSize: 24,
    color: colors.textDark,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 10,
  },
  titledesc: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
  },
  closebtn: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 999,
  },
})

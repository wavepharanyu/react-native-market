import React from 'react'
import { StyleSheet, ScrollView, Alert, Button } from 'react-native'
import * as Yup from 'yup'

import { Form, FormField, SubmitButton } from '../components/forms'
import Screen from '../components/Screen'
import FormImagePicker from '../components/forms/FormImagePicker'

import { collection, doc, addDoc, updateDoc, arrayRemove, setDoc, arrayUnion } from 'firebase/firestore/lite'
import { db, storage } from '../firebase/firebase-config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const validationSchema = Yup.object().shape({
  title: Yup.string().required('ป้อนชื่อสินค้าก่อน').min(1).label('Title'),
  location: Yup.string().required('ป้อนสถานที่ก่อน').min(1).label('location'),
  price: Yup.number()
    .required('ป้อนราคาก่อน')
    .min(1, 'ราคาต้องมากกว่า 0')
    .max(1000000)
    .label('Price'),
  description: Yup.string()
    .required('ป้อนราคาก่อน')
    .min(1)
    .label('Description'),
  images: Yup.array().min(1, 'เลือกรูปสินค้าอย่างน้อย 1 รูปก่อน'),
})

const PostingScreen = ({navigation}) => {

  // สร้างฟังก์ชันสำหรับอ่าน path รูปแล้วแปลงเป็น Blob
  const getPictureBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })
  }

  const handleSubmit = async productData => {

    const genID = productData.id.toString()
    // upload file image
    await setDoc(doc(db, 'products', genID), productData)

    const promises = [];
    for (var i = 0; i < productData.images.length; i++) {
      const fileURL = productData.images[i]
      const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1)
      const file = await getPictureBlob(fileURL)

      const storageRef = ref(storage, filename)
  
      promises.push(uploadBytes(storageRef, file).then(uploadResult => {return getDownloadURL(uploadResult.ref)}))
    }

    const photos = await Promise.all(promises);

    await updateDoc(doc(db, 'products', genID), { images: photos });

    Alert.alert(
      'สำเร็จ', 
      'ลงประกาศสินค้าเรียบร้อยแล้ว', 
      [
        {
          text: "ตกลง",
          onPress: () => navigation.navigate("Feed", {screen: 'Listings'}),
        },
      ]
    )
  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          id: Math.floor(100000 + Math.random() * 900000),
          title: '',
          location: '',
          price: '',
          description: '',
          images: [],
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}>
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="ชื่อสินค้า" />
        <FormField maxLength={128} name="location" placeholder="สถานที่" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="ราคา"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="รายละเอียดสินค้า"
        />
        <SubmitButton title="ลงประกาศ" />
      </Form>
    </Screen>
  )
}

export default PostingScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
})

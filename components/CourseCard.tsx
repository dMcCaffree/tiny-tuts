import {Text, View} from "./Themed";
import {Dimensions, Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {Link} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import formatNumber from '../helpers/formatNumber';

export default function CourseCard(
  { to, thumbnailImage, authorName, authorAvatar, students, isEnrolled, courseId }:
  { to: string, thumbnailImage: string, authorName: string, authorAvatar: string, students: number, isEnrolled: boolean, courseId: string }
  ) {
  const navigation = useNavigation();
  const height = Dimensions.get('window').height * .62;
  const width = height * .537525;

  return (
    <View style={[styles.group, styles.courseCard]}>
      <View style={[styles.group, styles.borderRadius]}>
        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('Overlay', {screen: '/CourseScreen', params: {courseId}})}>
            <Image source={{uri: thumbnailImage}} style={{width, height}}/>
        </TouchableOpacity>
      </View>
      <View style={[styles.group, styles.row]}>
        <TouchableOpacity activeOpacity={.8}>
          <Image source={{uri: authorAvatar}} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.group}>
          <TouchableOpacity activeOpacity={.8}>
            <Text style={[styles.name]}>{authorName}</Text>
          </TouchableOpacity>
          <View style={styles.group}>
            <Text style={styles.students}>{`${formatNumber(students)} Students`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: 'transparent',
    marginLeft: 20,
  },
  group: {
    backgroundColor: 'transparent',
  },
  borderRadius: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '600',
  },
  students: {
    color: '#4E586E',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  column: {
    flexDirection: 'column',
  },
});

import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions} from 'react-native';

import {Text, View} from '../components/Themed';
import CourseCard from "../components/CourseCard";

export default function LearnScreen() {
  const [currentTab, setCurrentTab] = useState('enrolled');
  const height = Dimensions.get('window').height * .62;
  const width = height * .537525;
  const gutterSize = (Dimensions.get('window').width - width) / 2;
  const courses = [
    {
      author: {
        name: 'Dustin McCaffree',
        avatar: 'https://i.ibb.co/v18LBf3/square-dustin.png',
      },
      title: 'Design For Devs',
      thumbnailImage: 'https://i.ibb.co/N7GWYG1/thumbnail-1.png',
      students: 1310,
      id: 'cf2342eeb4df',
      isEnrolled: true,
    },
    {
      author: {
        name: 'Dustin McCaffree',
        avatar: 'https://i.ibb.co/v18LBf3/square-dustin.png',
      },
      title: 'Design Basics',
      thumbnailImage: 'https://i.ibb.co/thkZ8ZP/thumbnail-2.png',
      students: 21299,
      id: 'bf2311cda3de',
      isEnrolled: false,
    }
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.horizontalScrollView} showsHorizontalScrollIndicator={false} horizontal>
          <TouchableOpacity activeOpacity={.8}>
            <Text style={[styles.title, currentTab === 'enrolled' && styles.activeTitle]}>Enrolled</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8}>
            <Text style={styles.title}>Popular</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={[styles.horizontalScrollView, {paddingTop: 0}]} showsHorizontalScrollIndicator={false} horizontal>
          {courses.map(course => (
            <CourseCard
              to={`/CourseScreen/${course.id}`}
              thumbnailImage={course.thumbnailImage}
              key={`course-${course.id}`}
              authorAvatar={course.author.avatar}
              authorName={course.author.name}
              students={course.students}
              isEnrolled={course.isEnrolled}
              courseId={course.id}
            />
          ))}
          <View style={{width: gutterSize, backgroundColor: 'transparent'}}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242A37',
  },
  safeArea: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#30364B',
    marginRight: 10,
    marginLeft: 20,
  },
  activeTitle: {
    color: '#ffffff',
  },
  horizontalScrollView: {
    paddingTop: 30,
  },
  group: {
    backgroundColor: 'transparent',
  },
  borderRadius: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Video} from "expo-av";
import {useNavigation} from '@react-navigation/native';
import CloseIcon from '../assets/images/close.png';
import {Text, View} from '../components/Themed';

export default function CourseScreen() {
  const videoElement = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [percentComplete, setPercentComplete] = useState(.01);
  const [currentSpot, setCurrentSpot] = useState(0);
  const navigation = useNavigation();
  const {height, width} = Dimensions.get('window');
  const course = {
    author: {
      name: 'Dustin McCaffree',
      avatar: 'https://i.ibb.co/v18LBf3/square-dustin.png',
    },
    title: 'Design For Devs',
    thumbnailImage: 'https://i.ibb.co/N7GWYG1/thumbnail-1.png',
    students: 1310,
    id: 'cf2342eeb4df',
    isEnrolled: true,
    videoId: 'sP7QhugVi7kyCV58TDn35GUDvPKkAcplPrBJYXsBVcE'
  };
  const thumbnailUri = `https://image.mux.com/${course.videoId}/thumbnail.jpg?width=270&height=480&fit_mode=crop&time=0.1`;
  const videoUri = `https://stream.mux.com/${course.videoId}.m3u8`;

  useEffect(() => {
    Image.prefetch(thumbnailUri);
  }, []);

  const updateVideoPosition = (e: any) => {
    setPercentComplete(Math.round((e.positionMillis / e.durationMillis * 100) * 100) / 100);
    setCurrentSpot(e.positionMillis);
  };

  const pauseVideo = () => {
    if (videoElement && videoElement.current) {
      // @ts-ignore
      videoElement.current.pauseAsync();
    }
  };

  const playVideo = () => {
    if (videoElement && videoElement.current) {
      // @ts-ignore
      videoElement.current.playAsync();
    }
  };

  return (
    <View style={[styles.container, {height, width}]}>
      <View style={{width: width - 40, height: 4, position: 'absolute', top: 40, left: 20, backgroundColor: 'rgba(255,255,255,.3)'}}>
        <View style={{width: `${percentComplete}%`, height: '100%', backgroundColor: 'white'}}/>
      </View>
      <View style={[styles.group, styles.row, {position: 'absolute', top: 40, left: 20}]}>
        <TouchableOpacity activeOpacity={.8}>
          <Image source={{uri: course.author.avatar}} style={styles.avatar}/>
        </TouchableOpacity>
        <View style={styles.group}>
          <TouchableOpacity activeOpacity={.8}>
            <Text style={[styles.name]}>{course.author.name}</Text>
          </TouchableOpacity>
          <View style={styles.group}>
            <Text style={styles.students}>{`${course.students} Students`}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8} style={styles.backButton}>
        <Image source={CloseIcon}/>
      </TouchableOpacity>
      {isLoading && <Image source={{uri: thumbnailUri}} style={[styles.videoOverlay, {height, width}]}/>}
      <TouchableWithoutFeedback
        onPressIn={pauseVideo}
        onPressOut={playVideo}
      >
        <Video
          source={{uri: videoUri}}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          style={{height, width, zIndex: -2, top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}}
          shouldPlay
          isLooping={false}
          onLoad={() => setIsLoading(false)}
          onPlaybackStatusUpdate={updateVideoPosition}
          progressUpdateIntervalMillis={60}
          ref={videoElement}
        />
      </TouchableWithoutFeedback>
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
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  students: {
    color: '#ffffff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  column: {
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    top: 65,
    right: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 30,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  }
});

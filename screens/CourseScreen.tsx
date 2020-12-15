import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from 'react-native';
import {Video} from "expo-av";
import {useNavigation} from '@react-navigation/native';
import CloseIcon from '../assets/images/close.png';
import {Text, View} from '../components/Themed';
import {SvgXml} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import {comments, notes} from '../assets/images/icons/icons';
import NotificationsBadge from "../components/NotificationsBadge";
import BottomSheet from 'reanimated-bottom-sheet';

export default function CourseScreen() {
  const videoElement = useRef(null);
  const notesSheetElement = useRef(null);
  const commentsSheetElement = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [percentComplete, setPercentComplete] = useState(.01);
  const [currentSpot, setCurrentSpot] = useState(0);
  const [sheetIsVisible, setSheetIsVisible] = useState(false);
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

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

  const openComments = () => {
    fadeIn();
    pauseVideo();
    setSheetIsVisible(true)
    if (commentsSheetElement && commentsSheetElement.current) {
      // @ts-ignore
      commentsSheetElement.current.snapTo(0);
    }
  };

  const closeComments = () => {
    fadeOut();
    playVideo();
    if (commentsSheetElement && commentsSheetElement.current) {
      // @ts-ignore
      commentsSheetElement.current.snapTo(2);
    }
    setSheetIsVisible(false);
  };


  const openNotes = () => {
    fadeIn();
    pauseVideo();
    setSheetIsVisible(true);
    if (notesSheetElement && notesSheetElement.current) {
      // @ts-ignore
      notesSheetElement.current.snapTo(0);
    }
  };

  const closeNotes = () => {
    fadeOut();
    playVideo();
    setSheetIsVisible(false);
    if (notesSheetElement && notesSheetElement.current) {
      // @ts-ignore
      notesSheetElement.current.snapTo(2);
    }
  };

  const closeSheets = () => {
    if (notesSheetElement && notesSheetElement.current) {
      // @ts-ignore
      notesSheetElement.current.snapTo(2);
    }
    if (commentsSheetElement && commentsSheetElement.current) {
      // @ts-ignore
      commentsSheetElement.current.snapTo(2);
    }
    setSheetIsVisible(false);
    fadeOut();
    playVideo();
  };

  return (
    <View style={[styles.container, {height, width}]}>
      <View style={{
        width: width - 40,
        height: 4,
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(255,255,255,.3)'
      }}>
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
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)', 'rgba(0,0,0,.5)']}
        style={styles.gradient}
        pointerEvents="none"
      />
    <Animated.View
      style={[
        styles.modalBackground,
        {
          opacity: fadeAnim,
        }
      ]}
      pointerEvents={sheetIsVisible ? 'auto' : 'none'}
    >
      <TouchableOpacity
        onPress={closeSheets}
        style={styles.overlay}
      />
    </Animated.View>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8} style={styles.backButton}>
        <Image source={CloseIcon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={openComments} activeOpacity={.6} style={[styles.backButton, styles.commentsButton]}>
        <SvgXml xml={comments} width={30} height={30}/>
        <NotificationsBadge count={87}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={openNotes} activeOpacity={.6} style={[styles.backButton, styles.notesButton]}>
        <SvgXml xml={notes} width={26} height={26}/>
      </TouchableOpacity>
      {isLoading && <Image source={{uri: thumbnailUri}} style={[styles.videoOverlay, {height, width}]}/>}
      <TouchableWithoutFeedback
        onPressIn={pauseVideo}
        onPressOut={playVideo}
        onPress={() => Keyboard.dismiss()}
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
      <BottomSheet
        snapPoints={[
          '85%',
          0,
          0,
        ]}
        renderContent={() => (
          <View style={styles.modal}>
            <Text>Comments</Text>
            <TextInput
              placeholder="Write a comment or note..."
              style={styles.input}
              placeholderTextColor="#ffffff"
              onFocus={pauseVideo}
              onBlur={playVideo}
            />
          </View>
        )
        }
        ref={commentsSheetElement}
        enabledBottomClamp
        initialSnap={2}
        onCloseEnd={closeSheets}
      />
      <BottomSheet
        snapPoints={[
          '85%',
          0,
          0
        ]}
        renderContent={() => (
          <View style={styles.modal}>
            <Text>Notes</Text>
            <TextInput
              placeholder="Write a comment or note..."
              style={styles.input}
              placeholderTextColor="#ffffff"
              onFocus={pauseVideo}
              onBlur={playVideo}
            />
          </View>
        )
        }
        ref={notesSheetElement}
        enabledBottomClamp
        initialSnap={2}
        onCloseEnd={closeSheets}
      />
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
    height: 40,
    width: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  students: {
    color: '#ffffff',
    fontSize: 14,
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
  notesButton: {
    top: 'auto',
    bottom: 25,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  commentsButton: {
    top: 'auto',
    bottom: 25,
    right: 70,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
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
  },
  commentBox: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingTop: 100,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    marginBottom: 40,
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    marginTop: 30,
  },
  inputPlaceholder: {
    color: 'white',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 20,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

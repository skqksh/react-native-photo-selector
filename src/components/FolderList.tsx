import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import _ from 'lodash'

export interface FolderListProps {
  folderList?: FolderProps[]
}

export interface FolderProps {
  index: number
  title: string
  groupName?: string
  mainImageUrl: string
  count: number
}

const FolderList = ({
  folderList,
  setGroupName,
  setShowFolderList,
}: FolderListProps & {
  setGroupName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setShowFolderList: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <>
      {folderList && (
        <ScrollView style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          {_.map(
            folderList.sort((a, b) => a.index - b.index),
            (item: FolderProps, i: number): JSX.Element => {
              return (
                <TouchableOpacity
                  key={`FolderList-${i}`}
                  onPress={(): void => {
                    setGroupName(item.groupName)
                    setShowFolderList(false)
                  }}
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: 18 }}
                    >
                      {item.title}
                    </Text>
                    <Text>{item.count}</Text>
                  </View>
                  <View>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.mainImageUrl }}
                      resizeMode={'cover'}
                    />
                  </View>
                </TouchableOpacity>
              )
            }
          )}
        </ScrollView>
      )}
    </>
  )
}

export default FolderList

import { observable } from 'mobx'
import { PhotoProps } from '../index'

class CommonStore {
  @observable localSelected: PhotoProps[] = []
}

export default new CommonStore()

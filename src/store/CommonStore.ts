import { observable } from 'mobx'
import { PhotoProps } from '../index'

class CommonStore {
  @observable localSelected: PhotoProps[] = []
  @observable localSelectedUri: string[] = []
}

export default new CommonStore()

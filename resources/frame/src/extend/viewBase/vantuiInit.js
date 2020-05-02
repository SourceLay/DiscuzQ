import Vue from "vue";
import {
  RadioGroup,
  Radio,
  PasswordInput,
  Loading,
  Picker,
  Button,
  Popup,
  Cell,
  Tab,
  Tabs,
  Field,
  Divider,
  Search,
  NumberKeyboard,
  Checkbox,
  CheckboxGroup,
  Icon,
  uploader,
  List,
  PullRefresh,
  Image,
  ImagePreview
} from "vant";

Vue.use(RadioGroup)
  .use(Radio)
  .use(PasswordInput)
  .use(Loading)
  .use(Picker)
  .use(Icon)
  .use(Button)
  .use(Popup)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Divider)
  .use(Search)
  .use(NumberKeyboard)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(uploader)
  .use(List)
  .use(PullRefresh)
  .use(Image)
  .use(ImagePreview);

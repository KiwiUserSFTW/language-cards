// react
import { FC } from 'react';

// styles
import './title.scss';

type TitleProps = {
  title: string;
};
const Title: FC<TitleProps> = ({ title }) => {
  return <div className="instruction-title"> {title} </div>;
};

export default Title;

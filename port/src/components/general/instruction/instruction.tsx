// styles
import './instruction.scss';

// react
import { FC } from 'react';

// compoentns
import Paragraphs, { ParagraphsProps } from './paragraphs/paragraphs';
import Title from './title/title';

export type InstructionProps = ParagraphsProps & { title: string };

const Instruction: FC<InstructionProps> = ({
  paragraphs: { list, numerology },
  title,
}) => {
  return (
    <div className="instruction">
      <Title title={title} />
      <div className="instruction-container">
        {<Paragraphs paragraphs={{ list, numerology }} />}
      </div>
    </div>
  );
};

export default Instruction;

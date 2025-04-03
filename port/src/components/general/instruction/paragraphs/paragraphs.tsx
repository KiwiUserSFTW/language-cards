// styles
import './paragraphs.scss';

// react
import { FC, useMemo } from 'react';

// types

export type paragraph = {
  title: string;
  content?: string;
  inlineContent?: string[];
  note?: string;
};

export type ParagraphsProps = {
  paragraphs: {
    list: paragraph[];
    numerology: boolean;
  };
};

const Render: FC<{
  paragraph: paragraph;
  index: number;
  numerology: boolean;
}> = ({ paragraph, index, numerology }) => {
  const renderedParagraph = useMemo(() => {
    return (
      <>
        {numerology && <div className="paragraph-number">{index + 1}</div>}

        {paragraph.title && (
          <div className="paragraph-title">
            <p className="title">{paragraph.title}</p>
          </div>
        )}
        {paragraph.content && (
          <div className="paragraph-content">
            <p>{paragraph.content}</p>
          </div>
        )}
        {paragraph.inlineContent && (
          <div className="paragraph-inline-content">
            {paragraph.inlineContent.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
        {paragraph.note && (
          <div className="paragraph-note">
            <p>{paragraph.note}</p>
          </div>
        )}
      </>
    );
  }, [paragraph, numerology, index]);

  return (
    <div className={`paragraph ${!numerology ? 'no-number' : ''}`}>
      {renderedParagraph}
    </div>
  );
};

export const transformParagraph = (json: any): paragraph => {
  return {
    title: json.title,
    content: json.content,
    inlineContent: json['inline-content'],
    note: json.note,
  };
};

const Paragraphs: FC<ParagraphsProps> = ({
  paragraphs: { list, numerology },
}) => {
  const renderedParagraphs = useMemo(() => {
    return list.map((paragraph, index) => (
      <Render
        key={index}
        paragraph={transformParagraph(paragraph)}
        index={index}
        numerology={numerology}
      />
    ));
  }, [list, numerology]);

  return <div>{renderedParagraphs}</div>;
};

export default Paragraphs;

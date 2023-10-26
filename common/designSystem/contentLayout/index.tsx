import { ContentLayoutProps } from './types';
const ContentLayout = (props: ContentLayoutProps) => {
  const { children } = props;

  return (
    <div className="py-16 px-6 sm:py-20 sm:px-8 h-screen">
      {children}
    </div>
  );
};

export default ContentLayout;

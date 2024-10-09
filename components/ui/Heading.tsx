interface HeadingProps {
  title: string;
  desc: string;
}

const Heading = ({ desc, title }: HeadingProps) => {
  return <div>
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>;
};

export default Heading;

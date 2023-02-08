import { ImageInputList } from "./ImageInputList/ImageInputList";

export default function IndexPage() {
  const formdata = new Formdata();
  return (
    <div>
      <h1 className="shadow-md flex items-center space-x-4 p-4 m-4">
        Next.js + TypeScript + Tailwind Css
        <ImageInputList formData={formdata} />
      </h1>
    </div>
  );
}

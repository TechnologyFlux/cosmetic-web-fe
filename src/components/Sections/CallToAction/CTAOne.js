import { useForm } from "react-hook-form";

import SectionTitleOne from "../SectionTitle/SectionTitleOne";

export default function CTAOne() {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div
      className="cta -style-1"
      style={{ backgroundImage: 'url("/assets/images/art.png")' }}
    >
      
    </div>
  );
}

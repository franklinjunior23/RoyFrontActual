import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/componentUI/ui/card";
import { Progress } from "@/componentUI/ui/progress";
import { IconBrandElastic } from "@tabler/icons-react";

function ItemView({ Title, Color, Count }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex gap-2 items-center">
          <IconBrandElastic />
          {Title}
        </CardDescription>
        <CardTitle className="text-4xl">{Count}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Progress value={Count} aria-label={`${Title} cantidad ${Count}`} />
      </CardFooter>
    </Card>
  );
}

export default ItemView;

import { RobotDetailTemplate } from '@/templates/robots/RobotDetailTemplate';

interface RobotDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RobotDetailPage({ params }: RobotDetailPageProps) {
  const { id } = await params;
  const robotId = parseInt(id, 10);

  if (isNaN(robotId)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">無効なロボットIDです</p>
      </div>
    );
  }

  return <RobotDetailTemplate robotId={robotId} />;
}

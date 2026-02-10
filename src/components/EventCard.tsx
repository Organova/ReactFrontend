import { Event } from "@/types/common.ts";
import {
  Button,
  Card,
  CardBody,
  CardHeader, Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import DateDuration from "@/components/DateDuration.tsx";
import useEventStore from "@/stores/useEventStore.ts";
// import DateDurationShort from "@/components/DateDurationShort.tsx";

interface EventCardProps extends Event {
    onEdit: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ onEdit, ...event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {deleteEvent, fetchEvents} = useEventStore()

  const handleClick = () => {
    console.log("Clicked: " + event.name);
    onOpen()
  };

  const handleDelete = async () => {
      console.log("Deleted Event: " + event.eventId)

      try {
          await deleteEvent(event.eventId) // warten, bis das Event erstellt ist
          await fetchEvents(); // danach die Liste neu laden
          onClose()
      } catch (err) {
          console.error('Fehler beim Erstellen oder Laden der Events:', err);
      }
  }

  return (
    <>
      <Card className="py-4 w-full z-0" isPressable onPress={() => handleClick()}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{event.name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <DateDuration startDate={event.startDate} endDate={event.endDate}/>
          {/*  <DateDurationShort startDate={event.startDate} endDate={event.endDate}/>*/}
        </CardBody>
      </Card>

      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} className={"dark text-foreground"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={"inline text-3xl"}>
                {event.name}
                <Divider className={"mt-2"}/>
              </ModalHeader>
              <ModalBody className={"text-small"}>
                <h2 className="text-large font-bold">Description</h2>
                {event.description}
                <DateDuration startDate={event.startDate} endDate={event.endDate}/>
                <Divider className={"mt-2"}/>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="ghost" onPress={onClose}>Select</Button>
                <Button color="primary" variant="ghost" onPress={onEdit}>Edit</Button>
                <Button color="danger" variant="solid" onPress={() => handleDelete()}>Delete</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
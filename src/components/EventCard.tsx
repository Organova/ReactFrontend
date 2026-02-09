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

const EventCard: React.FC<Event> = (event) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {deleteEvent} = useEventStore()

  const handleClick = () => {
    console.log("Clicked: " + event.name);
    onOpen()
  };

  const handleDelete = () => {
      console.log("Deleted Event: " + event.id)
      deleteEvent(event.id)
      onClose()
  }

  return (
    <>
      <Card className="py-4 w-full" isPressable onPress={() => handleClick()}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{event.name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <DateDuration startDate={event.startDate} endDate={event.endDate}/>
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
                <Button color="primary" variant="ghost" onPress={onClose}>Edit</Button>
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
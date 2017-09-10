public interface VUI {

  private String sessionstate = "closed";

  public VUI(String state)  {
    sessionstate = state;
  }
  
public void open()  {
  }

  public void close() {
  }

  public void delete()  {
  }

   public void vitalReading()  {
  }

   public void activity()  {
  }

   public void medicationIntake()  {
  } 
}

package com.nguyenhuu.testselenium;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.testng.TestListenerAdapter;
import org.testng.TestNG;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

@SuppressWarnings("unused")
public class Application extends javafx.application.Application {

    public static void main(String[] args) {
        //runTestNg();
        //runJUnit();
        launch(args);
    }
    private static void runTestNg() {
        TestListenerAdapter tla = new TestListenerAdapter();
        TestNG test = new TestNG();
        test.setTestClasses(new Class[] {TestTestNg.class});
        test.addListener(tla);
        test.run();
        System.out.println("Passed: " + tla.getPassedTests().size());
        System.out.println("Failed: " + tla.getFailedTests().size());
    }
    private static void runJUnit() {
        JUnitCore jUnitCore = new JUnitCore();
        Result result = jUnitCore.run(TestJUnit.class);
        System.out.println("Passed: " + (result.getRunCount() - result.getFailureCount() - result.getIgnoreCount()));
        System.out.println("Failed: " + result.getFailureCount());
    }
    @Override
    public void start(Stage primaryStage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("/MainStage.fxml"));
        Scene scene = new Scene(root, 600, 400);
        scene.getStylesheets().add
        (getClass().getResource("/MainStage.css").toExternalForm());
        primaryStage.setTitle("Selenium Demo");
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
